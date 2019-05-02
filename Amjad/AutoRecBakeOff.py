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


def TrainModel():
    np.random.seed(0)
    random.seed(0)

# Load up common data set for the recommender algorithms
    (ed, evaluationData, rankings) = LoadEventData()

# Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)

# Just make random recommendations
    Random = NormalPredictor()
    evaluator.AddAlgorithm(Random, "Random")
    
#Autoencoder
    AutoRec = AutoRecAlgorithm()
    evaluator.AddAlgorithm(AutoRec, "AutoRec")

# Fight! (evaluvate)
    evaluator.Evaluate(True)
    evaluator.FitAndDump()

def TestModel(algo,testSubject):
    (ed, evaluationData, rankings) = LoadEventData()
    evaluator = Evaluator(evaluationData, rankings)
    evaluator.AddAlgorithm(algo, "AutoRec")
    recs = evaluator.SampleTopNRecs(ed,algo = algo, testSubject = testSubject)
    return recs



