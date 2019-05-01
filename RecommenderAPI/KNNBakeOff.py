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

import random
import numpy as np

def LoadEventData():
    event = EventData()
    print("Loading event ratings...")
    data = event.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = event.getPopularityRanks()
    return (event, data, rankings)

np.random.seed(0)
random.seed(0)


def knn(userID, isRecommend):
    
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = LoadEventData()
    
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
        
        # Fight!
        evaluator.Evaluate(False)
        
        surprise.dump.dump('models/userKnn.pkl', predictions=None, algo=UserKNN, verbose=0)
    else:
        
        (predictions, UserKNN) = surprise.dump.load('models/userKnn.pkl')
        evaluator.AddAlgorithm(UserKNN, "User KNN")
        return evaluator.SampleTopNRecs(event, UserKNN, userID)
