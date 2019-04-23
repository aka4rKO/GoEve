# -*- coding: utf-8 -*-
"""
@author: N.A.Amjad
"""
from EventData import EventData
from RBMAlgorithm import RBMAlgorithm
from surprise import NormalPredictor
from Evaluator import Evaluator

import random
import numpy as np

def LoadEventData():
    ed = EventData()
    print("Loading movie ratings...")
    data = ed.loadEventData()
    print("\nComputing movie popularity ranks so we can measure novelty later...")
    rankings = ed.getPopularityRanks()
    return (ed, data, rankings)

np.random.seed(0)
random.seed(0)

# Load up common data set for the recommender algorithms
(ed, evaluationData, rankings) = LoadEventData()

# Construct an Evaluator to, you know, evaluate them
evaluator = Evaluator(evaluationData, rankings)

#RBM
RBM = RBMAlgorithm(epochs=20)
evaluator.AddAlgorithm(RBM, "RBM")

# Just make random recommendations
Random = NormalPredictor()
evaluator.AddAlgorithm(Random, "Random")

# Fight!
evaluator.Evaluate(True)

evaluator.SampleTopNRecs(ed)
