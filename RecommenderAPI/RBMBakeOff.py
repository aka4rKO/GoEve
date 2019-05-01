# -*- coding: utf-8 -*-
"""
@author: N.A.Amjad
"""
from neuralFramework.EventData import EventData
from RBMAlgorithm import RBMAlgorithm
from surprise import NormalPredictor
from neuralFramework.Evaluator import Evaluator

import random
import numpy as np

def LoadEventData():
    ed = EventData()
    print("Loading Event ratings...")
    data = ed.loadEventData()
    # ed.loadEventData() returns the rating dataset
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = ed.getPopularityRanks()
    # ranking reperesents the popularity ranking 
    return (ed, data, rankings)


def TrainModel():
    np.random.seed(0)
    random.seed(0)

# Load up common data set for the recommender algorithms
    (ed, evaluationData, rankings) = LoadEventData()
# ed - EventData object
# evaluateData - rating dataset
# ranking - Popularity ranking for each event

# Construct an Evaluator to evaluate them
# Initally creates training set and test set 
    evaluator = Evaluator(evaluationData, rankings)

# RBM
# Just sets the epochs,hidden layer count,Batch Size and etc
    RBM = RBMAlgorithm(epochs=20)
    evaluator.AddAlgorithm(RBM, "RBM")

# Just make random recommendations
    Random = NormalPredictor()
    evaluator.AddAlgorithm(Random, "Random")

# Fight!
    evaluator.Evaluate(True)
    evaluator.FitAndDump()
    
def TestModel(algo,testSubject):
    (ed, evaluationData, rankings) = LoadEventData()
    evaluator = Evaluator(evaluationData, rankings)
    evaluator.AddAlgorithm(algo, "RBM")
    # evaluator.Evaluate(False)
    recs = evaluator.SampleTopNRecs(ed,algo = algo, testSubject = testSubject)
    return recs
     
   