# -*- coding: utf-8 -*-
"""
Created on Thu April 18 2019

@author: Akram Azarm
"""

from EventData import EventData
from surprise import KNNBasic
import heapq
from collections import defaultdict
from operator import itemgetter
        
testSubject = '3247'
k = 10

event = EventData()
data = event.loadEventData()

trainSet = data.build_full_trainset()

sim_options = {'name': 'cosine',
               'user_based': False
               }

model = KNNBasic(sim_options=sim_options)
model.fit(trainSet)
simsMatrix = model.compute_similarities()

testUserInnerID = trainSet.to_inner_uid(testSubject)

# Get the top K items we rated
testUserRatings = trainSet.ur[testUserInnerID]
kNeighbors = heapq.nlargest(k, testUserRatings, key=lambda t: t[1])

# Get similar items to stuff we liked (weighted by rating)
candidates = defaultdict(float)
for itemID, rating in kNeighbors:
    similarityRow = simsMatrix[itemID]
    for innerID, score in enumerate(similarityRow):
        candidates[innerID] += score * (rating / 5.0)
    
# Build a dictionary of stuff the user has already attended and rated
attended_rated = {}
for itemID, rating in trainSet.ur[testUserInnerID]:
    attended_rated[itemID] = 1
    
# Get top-rated items from similar users:
pos = 0
for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
    if not itemID in attended_rated:
        eventID = trainSet.to_raw_iid(itemID)
        print(event.getEventTitle(int(eventID)), ratingSum)
        pos += 1
        if (pos > 10):
            break

    


