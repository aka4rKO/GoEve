# -*- coding: utf-8 -*-
"""
Created on Fri April 19 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from Framework.EvaluationData import EvaluationData
from surprise import SVD, SVDpp
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


def svdAndSvdPp(userID, algo, isRecommend):
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = LoadEventData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    if algo == 'svd' and not isRecommend:
        
        # SVD
        Svd = SVD()
        evaluator.AddAlgorithm(Svd, "SVD")
        
        print("\nBuilding recommendation model...")
        ed = EvaluationData(evaluationData, rankings)
        trainSet = ed.GetFullTrainSet()
        Svd.fit(trainSet)
        
        evaluator.Evaluate(False)
        surprise.dump.dump('models/svd.pkl', predictions=None, algo=Svd, verbose=0)
    
    elif algo == 'svd' and isRecommend:
        
        (predictions, Svd) = surprise.dump.load('models/svd.pkl')
        evaluator.AddAlgorithm(Svd, "SVD")
        return evaluator.SampleTopNRecs(event, Svd, userID)
    
    elif algo == 'svdpp' and not isRecommend:
        
        # SVD++
        SvdPlusPlus = SVDpp()
        evaluator.AddAlgorithm(SvdPlusPlus, "SVD++")
        
        print("\nBuilding recommendation model...")
        ed = EvaluationData(evaluationData, rankings)
        trainSet = ed.GetFullTrainSet()
        SvdPlusPlus.fit(trainSet)
        
        evaluator.Evaluate(False)
        surprise.dump.dump('models/svdpp.pkl', predictions=None, algo=SvdPlusPlus, verbose=0)
        
    elif algo == 'svdpp' and isRecommend:
        
        (predictions, SvdPlusPlus) = surprise.dump.load('models/svdpp.pkl')
        evaluator.AddAlgorithm(SvdPlusPlus, "SVD++")
        return evaluator.SampleTopNRecs(event, SvdPlusPlus, userID)
