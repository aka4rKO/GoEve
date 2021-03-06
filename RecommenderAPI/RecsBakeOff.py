# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from surprise import SVD
from surprise import NormalPredictor
from Framework.Evaluator import Evaluator

import random
import numpy as np

def LoadEventsData():
    event = EventData()
    print("Loading event ratings...")
    data = event.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = event.getPopularityRanks()
    return (data, rankings)

np.random.seed(0)
random.seed(0)


def recsBakeOffEval():
    # Load up common data set for the recommender algorithms
    (evaluationData, rankings) = LoadEventsData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    # Throw in an SVD recommender
    SVDAlgorithm = SVD(random_state=10)
    evaluator.AddAlgorithm(SVDAlgorithm, "SVD")
    
    # Just make random recommendations
    Random = NormalPredictor()
    evaluator.AddAlgorithm(Random, "Random")
    
    
    # Fight!
    evaluator.Evaluate(True)

