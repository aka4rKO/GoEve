# -*- coding: utf-8 -*-
"""
Created on Wed April 24 2019

@author: Akram Azarm
"""

import SimpleUserCF
import SimpleItemCF
import ContentRecs
import KNNBakeOff
import RecsBakeOff
import SVDBakeOff

# Build models after getting updated CSV files from mongoDB
def buildModels():
    SimpleUserCF.simpleUserCF()
    
    SimpleItemCF.simpleItemCF()
    
    ContentRecs.contentRecs()
    
    KNNBakeOff.knn('0', False)
    
    # Just an evaluator
    RecsBakeOff.recsBakeOffEval()
    
    SVDBakeOff.svdAndSvdPp('0', 'svd', False)
    
    SVDBakeOff.svdAndSvdPp('0', 'svdpp', False)