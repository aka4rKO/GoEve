# -*- coding: utf-8 -*-
"""
@author: N.A.Amjad
"""

from surprise import AlgoBase
from surprise import PredictionImpossible
import numpy as np
from RBM import RBM


class RBMAlgorithm(AlgoBase):

    def __init__(self, epochs=20, hiddenDim=100, learningRate=0.001, batchSize=100, sim_options={}):
        AlgoBase.__init__(self)
        self.epochs = epochs
        self.hiddenDim = hiddenDim
        self.learningRate = learningRate
        self.batchSize = batchSize
        
    def softmax(self, x):
        return np.exp(x) / np.sum(np.exp(x), axis=0)

    def fit(self, trainset):
        AlgoBase.fit(self, trainset)
         
        # getting the number of users
        numUsers = trainset.n_users
        numItems = trainset.n_items
        
        # number of list in training matrix is equal to numUser
        # numItems is theno. of list inside the first list
        # 5 is the five zeros inside each inside list
        # 5 because the rating values can be 1,2,3,4,5
        trainingMatrix = np.zeros([numUsers, numItems, 5], dtype=np.float32)
        
        for (uid, iid, rating) in trainset.all_ratings():
           # print(int(float(rating)*2.0) - 1)
           # int(rating) - 1 (-1) to tell which position should be given 1
            adjustedRating = int(rating) - 1
            trainingMatrix[int(uid), int(iid), adjustedRating] = 1
        
        # Flatten to a 2D array, with nodes for each possible rating type on each possible item, for every user.
        # -1 one is put here to say unknow dimension keeping the row count as numUser
        trainingMatrix = np.reshape(trainingMatrix, [trainingMatrix.shape[0], -1])
        
        # Create an RBM with (num items * rating values) visible nodes
        # trainingMatrix.shape[1] denotes the number of visible nodes in the neural network
        rbm = RBM(trainingMatrix.shape[1], hiddenDimensions=self.hiddenDim, learningRate=self.learningRate, batchSize=self.batchSize, epochs=self.epochs)
        rbm.Train(trainingMatrix)

        self.predictedRatings = np.zeros([numUsers, numItems], dtype=np.float32)
        for uiid in range(trainset.n_users):
            if (uiid % 50 == 0):
                print("Processing user ", uiid)
            recs = rbm.GetRecommendations([trainingMatrix[uiid]])
            recs = np.reshape(recs, [numItems, 5])
            # changed   recs = np.reshape(recs, [numItems, 10]) to 5
            
            for itemID, rec in enumerate(recs):
                # The obvious thing would be to just take the rating with the highest score:                
                #rating = rec.argmax()
                # ... but this just leads to a huge multi-way tie for 5-star predictions.
                # The paper suggests performing normalization over K values to get probabilities
                # and take the expectation as your prediction, so we'll do that instead:
                normalized = self.softmax(rec)
                rating = np.average(np.arange(5), weights=normalized)
                # changed np.arrange(10) to 5
                self.predictedRatings[uiid, itemID] = rating + 1
                # rating changed from (rating + 1) * 0.5
        
        return self


    def estimate(self, u, i):

        if not (self.trainset.knows_user(u) and self.trainset.knows_item(i)):
            raise PredictionImpossible('User and/or item is unkown.')
        
        rating = self.predictedRatings[u, i]
        
        if (rating < 0.001):
            raise PredictionImpossible('No valid prediction exists.')
            
        return rating
    