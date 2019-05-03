# -*- coding: utf-8 -*-
"""
Created on Thu April 18 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from Framework.Evaluator import Evaluator
from surprise import KNNBasic
import heapq
from collections import defaultdict
from operator import itemgetter
import surprise
import Util


def simpleItemCF():
    
    # Load our data set
    event = EventData()
    data = event.loadEventData()
    
    (ed, evaluationData, rankings) = Util.LoadEventData()
    
    trainSet = data.build_full_trainset()
    
    sim_options = {'name': 'cosine',
                   'user_based': False
                   }
    
    model = KNNBasic(sim_options=sim_options)
    model.fit(trainSet)
    
    evaluator = Evaluator(evaluationData, rankings)
    evaluator.AddAlgorithm(model, "ItemCF")
    
    # Evaluating the algorithm to get the metrices
    evaluator.Evaluate(False)
    newMatrices = evaluator.evaluatedMetrics 
    print(newMatrices)
    
    filePath = 'scores/ItemCFScores.txt'
    modelPath = 'models/itemCf.pkl'
    
    if(Util.readFromFile(filePath, modelPath, model, newMatrices) == "File not found and model dumped"):
        return "File not found and model dumped"
    
    oldMatrices = Util.readFromFile(filePath, modelPath, model, newMatrices)

    if(oldMatrices['RMSE'] > newMatrices['RMSE'] and oldMatrices['MAE'] > newMatrices['MAE'] ):
        surprise.dump.dump(modelPath, predictions=None, algo=model, verbose=0)
        
        # Saving the new scores to a file
        Util.writeToFile(filePath, newMatrices)
        
        print("New model is better... Dumped the new model")
    else:
        print("Old model is better")
    
    
def SampleTopNRecs(userID, model):
    
    #compute the user similarity matrix
    simsMatrix = model.compute_similarities()
    
    event = EventData()
    data = event.loadEventData()
    
    trainSet = data.build_full_trainset()
    
    # Get top N similar users to our test subject
    testUserInnerID = trainSet.to_inner_uid(userID)
    
    # Get the top K items we rated
    testUserRatings = trainSet.ur[testUserInnerID]
    kNeighbors = heapq.nlargest(10, testUserRatings, key=lambda t: t[1])
    
    # Get similar items to stuff we liked (weighted by rating)
    candidates = defaultdict(float)
    for itemID, rating in kNeighbors:
        similarityRow = simsMatrix[itemID]
        for innerID, score in enumerate(similarityRow):
            candidates[innerID] += score * (rating / 5.0)
        
    # Build a dictionary of stuff the user has already attended and rated
    attended_rated = {}
    for itemID, rating in trainSet.ur[testUserInnerID]:
        attended_rated[itemID] = 1
        
    # Get top-rated items from similar users:
    pos = 0
    recsEventIds = []
    for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        if not itemID in attended_rated:
            eventID = trainSet.to_raw_iid(itemID)
            print(event.getEventTitle(int(eventID)), ratingSum)
            recsEventIds.append(int(eventID))
            pos += 1
            if (pos > 9):
                break
            
    return recsEventIds

    


