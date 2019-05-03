# -*- coding: utf-8 -*-
"""
Created on Fri May 3 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
import pickle
import surprise

def readFromFile(filePath, modelPath, model, newMatrices):
    try:
        with open(filePath, 'rb') as file:
            oldMatrices = pickle.load(file)
            print("Old matrices ", oldMatrices)
            return oldMatrices
    except FileNotFoundError : 
        print("no previous scores")
        surprise.dump.dump(modelPath, predictions=None, algo=model, verbose=0)
        
        # Saving the new scores to a file
        writeToFile(filePath, newMatrices)
        
        return "File not found and model dumped"
    

def writeToFile(filePath, newMatrices):
    with open(filePath, 'wb') as file:
        pickle.dump(newMatrices, file)    

    
def LoadEventData():
    event = EventData()
    print("Loading event ratings...")
    data = event.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = event.getPopularityRanks()
    return (event, data, rankings)

