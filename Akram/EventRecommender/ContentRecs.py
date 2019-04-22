# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from Framework.EvaluationData import EvaluationData
from ContentKNNAlgorithm import ContentKNNAlgorithm
from Framework.Evaluator import Evaluator
from surprise import NormalPredictor
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


def contentRecs():
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = LoadEventData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    contentKNN = ContentKNNAlgorithm()
    
    evaluator.AddAlgorithm(contentKNN, "ContentKNN")
    evaluator.Evaluate(False)
    
    surprise.dump.dump('models/contentKnn.pkl', predictions=None, algo=contentKNN, verbose=0)


