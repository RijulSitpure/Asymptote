import math

def isDigitorialPermutation(n: int) -> bool:
    facts = [math.factorial(i) for i in range(10)]
    digits = [int(d) for d in str(n)]
    fact_sum = sum(facts[d] for d in digits)
    return sorted(str(n)) == sorted(str(fact_sum))