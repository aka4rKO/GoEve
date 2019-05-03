# -*- coding: utf-8 -*-
"""
Created on Thu April 18 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from Framework.EvaluationData import EvaluationData
from surprise import KNNBasic
from surprise import NormalPredictor
from Framework.Evaluator import Evaluator
import surprise
import Util

import random
import numpy as np

np.random.seed(0)
random.seed(0)


def knn(userID, isRecommend):
    
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = Util.LoadEventData()
    
    # Construct an Evaluator to evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    if not isRecommend:
        
        # User-based KNN
        UserKNN = KNNBasic(sim_options = {'name': 'cosine', 'user_based': True})
        evaluator.AddAlgorithm(UserKNN, "User KNN")
        
        print("\nBuilding recommendation model...")
        ed = EvaluationData(evaluationData, rankings)
        trainSet = ed.GetFullTrainSet()
        UserKNN.fit(trainSet)
        
        # Evaluating the algorithm to get the metrices
        evaluator.Evaluate(False)
        newMatrices = evaluator.evaluatedMetrics 
        print(newMatrices)
        
        filePath = 'scores/UserRecsKNNScores.txt'
        modelPath = 'models/userKnn.pkl'
        
        if(Util.readFromFile(filePath, modelPath, UserKNN, newMatrices) == "File not found and model dumped"):
            return "File not found and model dumped"
        
        oldMatrices = Util.readFromFile(filePath, modelPath, UserKNN, newMatrices)
    
        if(oldMatrices['RMSE'] > newMatrices['RMSE'] and oldMatrices['MAE'] > newMatrices['MAE'] ):
            surprise.dump.dump(modelPath, predictions=None, algo=UserKNN, verbose=0)
            
            # Saving the new scores to a file
            Util.writeToFile(filePath, newMatrices)
            
            print("New model is better... Dumped the new model")
        else:
            print("Old model is better")
    else:
        
        (predictions, UserKNN) = surprise.dump.load('models/userKnn.pkl')
        evaluator.AddAlgorithm(UserKNN, "User KNN")
        return evaluator.SampleTopNRecs(event, UserKNN, userID)
