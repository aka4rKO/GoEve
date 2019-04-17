# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

from EventData import EventData
from ContentKNNAlgorithm import ContentKNNAlgorithm
from Evaluator import Evaluator
from surprise import NormalPredictor

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

# Load up common data set for the recommender algorithms
(event, evaluationData, rankings) = LoadEventData()

# Construct an Evaluator to, you know, evaluate them
evaluator = Evaluator(evaluationData, rankings)

contentKNN = ContentKNNAlgorithm()
evaluator.AddAlgorithm(contentKNN, "ContentKNN")

# Just make random recommendations
Random = NormalPredictor()
evaluator.AddAlgorithm(Random, "Random")

evaluator.Evaluate(False)

evaluator.SampleTopNRecs(event)


