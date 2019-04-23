
# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

import os
import csv
import sys
import re

from surprise import Dataset
from surprise import Reader

from collections import defaultdict
import numpy as np

class EventData:

    eventID_to_title = {}
    title_to_eventID = {}
    ratingsPath = "./dataset/rating.csv"
    eventsPath = "./dataset/event.csv"
    
    # Returns the ratings dataset
    def loadEventData(self):

        # Look for files relative to the directory we are running from
        os.chdir(os.path.dirname(sys.argv[0]))

        ratingsDataset = 0
        self.eventID_to_title = {}
        self.title_to_eventID = {}

        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)

        ratingsDataset = Dataset.load_from_file(self.ratingsPath, reader=reader)

        with open(self.eventsPath, newline='', encoding='ISO-8859-1') as csvfile:
                eventReader = csv.reader(csvfile)
                next(eventReader)  #Skip header line
                for row in eventReader:
                    eventID = int(row[0])
                    eventName = row[1]
                    self.eventID_to_title[eventID] = eventName
                    self.title_to_eventID[eventName] = eventID

        return ratingsDataset

    # Returns the list of event ids and the ratings given to each event by a user(user = userID)
    def getUserRatings(self, user):
        userRatings = []
        hitUser = False
        with open(self.ratingsPath, newline='') as csvfile:
            ratingReader = csv.reader(csvfile)
            next(ratingReader)
            for row in ratingReader:
                userID = int(row[0])
                if (user == userID):
                    eventID = int(row[2])
                    rating = float(row[4])
                    userRatings.append((eventID, rating))
                    hitUser = True
                if (hitUser and (user != userID)):
                    break

        return userRatings

    # Returns the ranking for each event id based on the number of (ratings given not sure) and how many times it was rated(used for NOVELTY)
    def getPopularityRanks(self):
        ratings = defaultdict(int)
        rankings = defaultdict(int)
        with open(self.ratingsPath, newline='') as csvfile:
            ratingReader = csv.reader(csvfile)
            next(ratingReader)
            for row in ratingReader:
                eventID = int(row[2])
                ratings[eventID] += 1
        rank = 1
        for eventID, ratingCount in sorted(ratings.items(), key=lambda x: x[1], reverse=True):
            rankings[eventID] = rank
            rank += 1
        return rankings
    
    # Returns the all the genres after converting them to integer bitfileds 
    def getGenres(self):
        genres = defaultdict(list)
        genreIDs = {}
        maxGenreID = 0
        with open(self.eventsPath, newline='', encoding='ISO-8859-1') as csvfile:
            eventReader = csv.reader(csvfile)
            next(eventReader)  #Skip header line
            for row in eventReader:
                eventID = int(row[0])
                genreList = row[2].split('|')
                genreIDList = []
                for genre in genreList:
                    if genre in genreIDs:
                        genreID = genreIDs[genre]
                    else:
                        genreID = maxGenreID
                        genreIDs[genre] = genreID
                        maxGenreID += 1
                    genreIDList.append(genreID)
                genres[eventID] = genreIDList
        # Convert integer-encoded genre lists to bitfields that we can treat as vectors
        for (eventID, genreIDList) in genres.items():
            bitfield = [0] * maxGenreID
            for genreID in genreIDList:
                bitfield[genreID] = 1
            genres[eventID] = bitfield            
        
        return genres
    
    # NOT USED
    def getYears(self):
        p = re.compile(r"(?:\((\d{4})\))?\s*$")
        years = defaultdict(int)
        with open(self.moviesPath, newline='', encoding='ISO-8859-1') as csvfile:
            movieReader = csv.reader(csvfile)
            next(movieReader)
            for row in movieReader:
                movieID = int(row[0])
                title = row[1]
                m = p.search(title)
                year = m.group(1)
                if year:
                    years[movieID] = int(year)
        return years
    
    # NOT USED
    def getMiseEnScene(self):
        mes = defaultdict(list)
        with open("LLVisualFeatures13K_Log.csv", newline='') as csvfile:
            mesReader = csv.reader(csvfile)
            next(mesReader)
            for row in mesReader:
                movieID = int(row[0])
                avgShotLength = float(row[1])
                meanColorVariance = float(row[2])
                stddevColorVariance = float(row[3])
                meanMotion = float(row[4])
                stddevMotion = float(row[5])
                meanLightingKey = float(row[6])
                numShots = float(row[7])
                mes[movieID] = [avgShotLength, meanColorVariance, stddevColorVariance,
                   meanMotion, stddevMotion, meanLightingKey, numShots]
        return mes
    
    def getEventTitle(self, eventID):
        if eventID in self.eventID_to_title:
            return self.eventID_to_title[eventID]
        else:
            return ""
        
    def getEventID(self, eventName):
        if eventName in self.title_to_eventID:
            return self.title_to_eventID[eventName]
        else:
            return 0

