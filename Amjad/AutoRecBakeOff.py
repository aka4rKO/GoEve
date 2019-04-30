# -*- coding: utf-8 -*-
"""
@author: Amjad
"""

from neuralFramework.EventData import EventData
from AutoRecAlgorithm import AutoRecAlgorithm
from surprise import NormalPredictor
from neuralFramework.Evaluator import Evaluator

import random
import numpy as np

def LoadEventData():
    ed = EventData()
    print("Loading event ratings...")
    data = ed.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = ed.getPopularityRanks()
    return (ed, data, rankings)

np.random.seed(0)
random.seed(0)

# Load up common data set for the recommender algorithms
(ed, evaluationData, rankings) = LoadEventData()

# Construct an Evaluator to, you know, evaluate them
evaluator = Evaluator(evaluationData, rankings)

#Autoencoder
AutoRec = AutoRecAlgorithm()
evaluator.AddAlgorithm(AutoRec, "AutoRec")

# Just make random recommendations
Random = NormalPredictor()
evaluator.AddAlgorithm(Random, "Random")

# Fight!
evaluator.Evaluate(True)

# evaluator.SampleTopNRecs(ed)
