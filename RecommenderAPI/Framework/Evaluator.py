# -*- coding: utf-8 -*-
"""
Created on Tue April 16 2019

@author: Akram Azarm
"""

from .EvaluationData import EvaluationData
from .EvaluatedAlgorithm import EvaluatedAlgorithm

class Evaluator:
    
    def __init__(self, dataset, rankings):
        ed = EvaluationData(dataset, rankings)
        self.dataset = ed
        
    def AddAlgorithm(self, algorithm, name):
        alg = EvaluatedAlgorithm(algorithm, name)
        self.algorithms = []
        self.algorithms.append(alg)
        
    def Evaluate(self, doTopN):
        self.evaluatedMetrics = {}
        
        results = {}
        for algorithm in self.algorithms:
            print("Evaluating ", algorithm.GetName(), "...")
            results[algorithm.GetName()] = algorithm.Evaluate(self.dataset, doTopN)

        # Print results
        print("\n")
        
        if (doTopN):
            print("{:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10}".format(
                    "Algorithm", "RMSE", "MAE", "HR", "cHR", "ARHR", "Coverage", "Diversity", "Novelty"))
            for (name, metrics) in results.items():
                print("{:<10} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f}".format(
                        name, metrics["RMSE"], metrics["MAE"], metrics["HR"], metrics["cHR"], metrics["ARHR"],
                                      metrics["Coverage"], metrics["Diversity"], metrics["Novelty"]))
                                                         
        else:
            print("{:<10} {:<10} {:<10}".format("Algorithm", "RMSE", "MAE"))
            for (name, metrics) in results.items():
                print("{:<10} {:<10.4f} {:<10.4f}".format(name, metrics["RMSE"], metrics["MAE"]))
                self.evaluatedMetrics = {"RMSE": metrics["RMSE"], "MAE": metrics["MAE"]}
                
        print("\nLegend:\n")
        print("RMSE:      Root Mean Squared Error. Lower values mean better accuracy.")
        print("MAE:       Mean Absolute Error. Lower values mean better accuracy.")
        if (doTopN):
            print("HR:        Hit Rate; how often we are able to recommend a left-out rating. Higher is better.")
            print("cHR:       Cumulative Hit Rate; hit rate, confined to ratings above a certain threshold. Higher is better.")
            print("ARHR:      Average Reciprocal Hit Rank - Hit rate that takes the ranking into account. Higher is better." )
            print("Coverage:  Ratio of users for whom recommendations above a certain threshold exist. Higher is better.")
            print("Diversity: 1-S, where S is the average similarity score between every possible pair of recommendations")
            print("           for a given user. Higher means more diverse.")
            print("Novelty:   Average popularity rank of recommended items. Higher means more novel.")
        
        
    def SampleTopNRecs(self, event, algo, testSubject=3247, k=10):
        print("User ID: "+str(testSubject))
        
        print("\nUsing recommender ")
        
        print("Computing recommendations...")
        testSet = self.dataset.GetAntiTestSetForUser(testSubject)
    
        predictions = algo.test(testSet)
        
        recommendations = []
        
        print ("\nWe recommend:")
        for userID, eventID, actualRating, estimatedRating, _ in predictions:
            intEventID = int(eventID)
            recommendations.append((intEventID, estimatedRating))
        
        recommendations.sort(key=lambda x: x[1], reverse=True)
        
        recsEventIds = []
        for ratings in recommendations[:10]:
            print(event.getEventTitle(ratings[0]), ratings[1])
            recsEventIds.append(ratings[0])
                
        return recsEventIds
                

            
            
    
    