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
import Util

import random
import numpy as np

np.random.seed(0)
random.seed(0)


def svdAndSvdPp(userID, algo, isRecommend):
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = Util.LoadEventData()
    
    if algo == 'svd' and not isRecommend:
        
        # Construct an Evaluator to, you know, evaluate them
        evaluatorSvdNotRec = Evaluator(evaluationData, rankings)
        
        # SVD
        Svd = SVD()
        evaluatorSvdNotRec.AddAlgorithm(Svd, "SVD")
        
        print("\nBuilding recommendation model...")
        ed = EvaluationData(evaluationData, rankings)
        trainSet = ed.GetFullTrainSet()
        Svd.fit(trainSet)
        
        # Evaluating the algorithm to get the metrices
        evaluatorSvdNotRec.Evaluate(False)
        
        newMatrices = evaluatorSvdNotRec.evaluatedMetrics 
        print(newMatrices)
        
        filePath = 'scores/SvdScores.txt'
        modelPath = 'models/svd.pkl'
        
        if(Util.readFromFile(filePath, modelPath, Svd, newMatrices) == "File not found and model dumped"):
            return "File not found and model dumped"
        
        oldMatrices = Util.readFromFile(filePath, modelPath, Svd, newMatrices)
    
        if(oldMatrices['RMSE'] > newMatrices['RMSE'] and oldMatrices['MAE'] > newMatrices['MAE'] ):
            surprise.dump.dump(modelPath, predictions=None, algo=Svd, verbose=0)
            
            # Saving the new scores to a file
            Util.writeToFile(filePath, newMatrices)
            
            print("New model is better... Dumped the new model")
        else:
            print("Old model is better")
        #surprise.dump.dump('models/svd.pkl', predictions=None, algo=Svd, verbose=0)
    
    elif algo == 'svd' and isRecommend:
        
        # Construct an Evaluator to, you know, evaluate them
        evaluatorSvdRec = Evaluator(evaluationData, rankings)
        
        (predictions, Svd) = surprise.dump.load('models/svd.pkl')
        evaluatorSvdRec.AddAlgorithm(Svd, "SVD")
        return evaluatorSvdRec.SampleTopNRecs(event, Svd, userID)
    
    elif algo == 'svdpp' and not isRecommend:
        
        # Construct an Evaluator to, you know, evaluate them
        evaluatorSvdppNotRec = Evaluator(evaluationData, rankings)
        
        # SVD++
        SvdPlusPlus = SVDpp()
        evaluatorSvdppNotRec.AddAlgorithm(SvdPlusPlus, "SVD++")
        
        print("\nBuilding recommendation model...")
        ed = EvaluationData(evaluationData, rankings)
        trainSet = ed.GetFullTrainSet()
        SvdPlusPlus.fit(trainSet)
        
        # Evaluating the algorithm to get the metrices
        evaluatorSvdppNotRec.Evaluate(False)
        
        newMatrices = evaluatorSvdppNotRec.evaluatedMetrics 
        print(newMatrices)
        
        filePath = 'scores/SvdppScores.txt'
        modelPath = 'models/svdpp.pkl'
        
        if(Util.readFromFile(filePath, modelPath, SvdPlusPlus, newMatrices) == "File not found and model dumped"):
            return "File not found and model dumped"
        
        oldMatrices = Util.readFromFile(filePath, modelPath, SvdPlusPlus, newMatrices)
    
        if(oldMatrices['RMSE'] > newMatrices['RMSE'] and oldMatrices['MAE'] > newMatrices['MAE'] ):
            surprise.dump.dump(modelPath, predictions=None, algo=SvdPlusPlus, verbose=0)
            
            # Saving the new scores to a file
            Util.writeToFile(filePath, newMatrices)
            
            print("New model is better... Dumped the new model")
        else:
            print("Old model is better")
        
        #surprise.dump.dump('models/svdpp.pkl', predictions=None, algo=SvdPlusPlus, verbose=0)
        
    elif algo == 'svdpp' and isRecommend:
        
        # Construct an Evaluator to, you know, evaluate them
        evaluatorSvdppRec = Evaluator(evaluationData, rankings)
        
        (predictions, SvdPlusPlus) = surprise.dump.load('models/svdpp.pkl')
        evaluatorSvdppRec.AddAlgorithm(SvdPlusPlus, "SVD++")
        return evaluatorSvdppRec.SampleTopNRecs(event, SvdPlusPlus, userID)
