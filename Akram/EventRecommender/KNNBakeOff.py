# -*- coding: utf-8 -*-
"""
Created on Thu April 18 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from surprise import KNNBasic
from surprise import NormalPredictor
from Framework.Evaluator import Evaluator

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


def knn(userID):
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = LoadEventData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    # User-based KNN
    UserKNN = KNNBasic(sim_options = {'name': 'cosine', 'user_based': True})
    evaluator.AddAlgorithm(UserKNN, "User KNN")
    
    # Item-based KNN
    ItemKNN = KNNBasic(sim_options = {'name': 'cosine', 'user_based': False})
    evaluator.AddAlgorithm(ItemKNN, "Item KNN")
    
    # Just make random recommendations
    Random = NormalPredictor()
    evaluator.AddAlgorithm(Random, "Random")
    
    # Fight!
    evaluator.Evaluate(False)
    
    evaluator.SampleTopNRecs(event, userID)
