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
import Util

import random
import numpy as np

np.random.seed(0)
random.seed(0)


def contentRecs():
    # Load up common data set for the recommender algorithms
    (event, evaluationData, rankings) = Util.LoadEventData()
    
    # Construct an Evaluator to, you know, evaluate them
    evaluator = Evaluator(evaluationData, rankings)
    
    contentKNN = ContentKNNAlgorithm()
    
    evaluator.AddAlgorithm(contentKNN, "ContentKNN")
    
    # Evaluating the algorithm to get the metrices
    evaluator.Evaluate(False)
    newMatrices = evaluator.evaluatedMetrics 
    print(newMatrices)
    
    filePath = 'scores/ContentRecsKNNScores.txt'
    modelPath = 'models/contentKnn.pkl'
    
    if(Util.readFromFile(filePath, modelPath, contentKNN, newMatrices) == "File not found and model dumped"):
        return "File not found and model dumped"
    
    oldMatrices = Util.readFromFile(filePath, modelPath, contentKNN, newMatrices)

    if(oldMatrices['RMSE'] > newMatrices['RMSE'] and oldMatrices['MAE'] > newMatrices['MAE'] ):
        surprise.dump.dump(modelPath, predictions=None, algo=contentKNN, verbose=0)
        
        # Saving the new scores to a file
        Util.writeToFile(filePath, newMatrices)
        
        print("New model is better... Dumped the new model")
    else:
        print("Old model is better")


