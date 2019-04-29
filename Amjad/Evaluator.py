# -*- coding: utf-8 -*-
"""
@author: N.A.Amjad
"""
from EvaluationData import EvaluationData
from EvaluatedAlgorithm import EvaluatedAlgorithm
import surprise

class Evaluator:
    
    algorithms = []
    
    def __init__(self, dataset, rankings):
        # dataset - Rating dataset 
        # rankings- Popularity rankings
        evalD = EvaluationData(dataset, rankings)
        self.dataset = evalD
        
    def AddAlgorithm(self, algorithm, name):
        # creating the object of EvaluationAlgorithm 
        alg = EvaluatedAlgorithm(algorithm, name)
        # adding to the list of algorithms
        self.algorithms.append(alg)
        
    def Evaluate(self, doTopN):
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
        
        
    def FitAndDump(self):
             
        for algo in self.algorithms:
                
            print("\nUsing recommender ", algo.GetName())
            
            print("\nBuilding recommendation model...")
            trainSet = self.dataset.GetFullTrainSet()
            modelName = 'models/' + algo.GetName() + '.pkl'
            algo = algo.GetAlgorithm().fit(trainSet)
            surprise.dump.dump(modelName, predictions=None, algo=algo, verbose=0)
            
      
    def SampleTopNRecs(self, ed, algo, testSubject, k=10):
        alg = ""
        for algorithm in self.algorithms:
            if(type(algorithm.GetAlgorithm()) == type(algo)):
                alg = algorithm
        
        print("\nUsing recommender ", alg.GetName())
            
#            print("\nBuilding recommendation model...")
#            trainSet = self.dataset.GetFullTrainSet()
#            algo.GetAlgorithm().fit(trainSet)
            
        print("Computing recommendations...")
        testSet = self.dataset.GetAntiTestSetForUser(testSubject)
        
        predictions = algo.test(testSet)
            
        recommendations = []
        recs = []
            
        print ("\nWe recommend:")
        for userID,eventID, actualRating, estimatedRating, _ in predictions:
            intEventID = int(eventID)
            recommendations.append((intEventID, estimatedRating))
            recs.append((intEventID, estimatedRating))
                
        recommendations.sort(key=lambda x: x[1], reverse=True)
        recs.sort(key=lambda x: x[1], reverse=True)
        return recs[:k]
           
                

            
            
    
    