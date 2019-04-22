# -*- coding: utf-8 -*-
"""
Created on Sat April 20 2019

@author: Akram Azarm
"""

import surprise
from Framework.EventData import EventData

import SimpleUserCF
import SimpleItemCF
import ContentRecs
import KNNBakeOff
import RecsBakeOff
import SVDBakeOff

def LoadEventData():
    event = EventData()
    print("Loading event ratings...")
    data = event.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = event.getPopularityRanks()
    return (event, data, rankings)

#### BUILDING MODELS
#SimpleUserCF.simpleUserCF()

#SimpleItemCF.simpleItemCF('3247')

#ContentRecs.contentRecs()

#KNNBakeOff.knn('3120')

#RecsBakeOff.recsBakeOffEval()

#SVDBakeOff.svdAndSvdPp('3222')





#### GETTING RECOMMENDATIONS
def getContentKNNRecs(userID):
    (event, evaluationData, rankings) = LoadEventData()
    (predictions, contentKNN) = surprise.dump.load('models/contentKnn.pkl')
    recs = contentKNN.SampleTopNRecs(event, userID)
    print(recs)
    
def getUserCF(userID):
    (predictions, userCF) = surprise.dump.load('models/userCf.pkl')
    recs = SimpleUserCF.SampleTopNRecs(userID, userCF)
    print(recs)    

#getUserCF('3247')

#getContentKNNRecs('3124')



