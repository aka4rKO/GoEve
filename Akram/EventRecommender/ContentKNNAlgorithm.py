# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

from surprise import AlgoBase
from surprise import PredictionImpossible
from Framework.EventData import EventData
from Framework.EvaluationData import EvaluationData
import math
import numpy as np
import heapq

class ContentKNNAlgorithm(AlgoBase):

    def __init__(self, k=40, sim_options={}):
        AlgoBase.__init__(self)
        self.k = k
        event = EventData()
        ed = EvaluationData(event.loadEventData(), event.getPopularityRanks())
        self.dataset = ed
        
        print("\nBuilding recommendation model...")
        trainSet = ed.GetFullTrainSet()
        self.fit(trainSet)

    def fit(self, trainset):
        AlgoBase.fit(self, trainset)

        # Compute item similarity matrix based on content attributes

        # Load up genre vectors for every event
        event = EventData()
        genres = event.getGenres()
        
        print("Computing content-based similarity matrix...")
            
        # Compute genre distance for every event combination as a 2x2 matrix
        self.similarities = np.zeros((self.trainset.n_items, self.trainset.n_items))
        
        for thisRating in range(self.trainset.n_items):
            if (thisRating % 100 == 0):
                print(thisRating, " of ", self.trainset.n_items)
            for otherRating in range(thisRating+1, self.trainset.n_items):
                thisEventID = int(self.trainset.to_raw_iid(thisRating))
                otherEventID = int(self.trainset.to_raw_iid(otherRating))
                genreSimilarity = self.computeGenreSimilarity(thisEventID, otherEventID, genres)
                self.similarities[thisRating, otherRating] = genreSimilarity
                self.similarities[otherRating, thisRating] = self.similarities[thisRating, otherRating]
                
        print("...done.")
                
        return self
    
    def computeGenreSimilarity(self, event1, event2, genres):
        genres1 = genres[event1]
        genres2 = genres[event2]
        sumxx, sumxy, sumyy = 0, 0, 0
        for i in range(len(genres1)):
            x = genres1[i]
            y = genres2[i]
            sumxx += x * x
            sumyy += y * y
            sumxy += x * y
        
        return sumxy/math.sqrt(sumxx*sumyy)
    
    # NOT USED
    def computeYearSimilarity(self, movie1, movie2, years):
        diff = abs(years[movie1] - years[movie2])
        sim = math.exp(-diff / 10.0)
        return sim
    
    # NOT USED
    def computeMiseEnSceneSimilarity(self, movie1, movie2, mes):
        mes1 = mes[movie1]
        mes2 = mes[movie2]
        if (mes1 and mes2):
            shotLengthDiff = math.fabs(mes1[0] - mes2[0])
            colorVarianceDiff = math.fabs(mes1[1] - mes2[1])
            motionDiff = math.fabs(mes1[3] - mes2[3])
            lightingDiff = math.fabs(mes1[5] - mes2[5])
            numShotsDiff = math.fabs(mes1[6] - mes2[6])
            return shotLengthDiff * colorVarianceDiff * motionDiff * lightingDiff * numShotsDiff
        else:
            return 0
        
    def SampleTopNRecs(self, event, testSubject=3247, k=10):
        print("User ID: "+str(testSubject))
        
        #for algo in self.algorithms:
        print("\nUsing recommender ContentKNN")
        
        print("Computing recommendations...")
        testSet = self.dataset.GetAntiTestSetForUser(testSubject)
    
        predictions = self.test(testSet)
        
        recommendations = []
        
        print ("\nWe recommend:")
        for userID, eventID, actualRating, estimatedRating, _ in predictions:
            intEventID = int(eventID)
            recommendations.append((intEventID, estimatedRating))
        
        recommendations.sort(key=lambda x: x[1], reverse=True)
        recsEventIds = []
        for ratings in recommendations[:10]:
            print(event.getEventTitle(ratings[0]), ratings[1])
            recsEventIds.append(ratings[0])
            
        return recsEventIds
        

    def estimate(self, u, i):

        if not (self.trainset.knows_user(u) and self.trainset.knows_item(i)):
            raise PredictionImpossible('User and/or item is unkown.')
        
        # Build up similarity scores between this item and everything the user rated
        neighbors = []
        for rating in self.trainset.ur[u]:
            genreSimilarity = self.similarities[i,rating[0]]
            neighbors.append( (genreSimilarity, rating[1]) )
        
        # Extract the top-K most-similar ratings
        k_neighbors = heapq.nlargest(self.k, neighbors, key=lambda t: t[0])
        
        # Compute average sim score of K neighbors weighted by user ratings
        simTotal = weightedSum = 0
        for (simScore, rating) in k_neighbors:
            if (simScore > 0):
                simTotal += simScore
                weightedSum += simScore * rating
            
        if (simTotal == 0):
            raise PredictionImpossible('No neighbors')

        predictedRating = weightedSum / simTotal

        return predictedRating
    