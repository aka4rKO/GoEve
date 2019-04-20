# -*- coding: utf-8 -*-
"""
Created on Fri April 19 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from surprise import SVD, SVDpp
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


def svdAndSvdPp(userID):
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = LoadEventData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    # SVD
    Svd = SVD()
    evaluator.AddAlgorithm(Svd, "SVD")
    
    # SVD++
    SvdPlusPlus = SVDpp()
    evaluator.AddAlgorithm(SvdPlusPlus, "SVD++")
    
    # Just make random recommendations
    Random = NormalPredictor()
    evaluator.AddAlgorithm(Random, "Random")
    
    # Fight!
    evaluator.Evaluate(False)
    
    evaluator.SampleTopNRecs(event, userID)
