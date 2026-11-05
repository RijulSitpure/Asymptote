class Solution:
    def checkDivisibility(self, n: int) -> bool:
        s = str(abs(n))
        digit_sum = sum(int(ch) for ch in s)
        digit_prod = 1
        for ch in s:
            digit_prod *= int(ch)
            
        if digit_sum == 0 or n % digit_sum != 0:
            return False
        if digit_prod > 0 and n % digit_prod != 0:
            return False
        return True

def run_tests():
    s = Solution()
    res1 = s.checkDivisibility(12) # sum 3 (12%3==0), prod 2 (12%2==0) -> True
    assert res1 is True, f"Expected True, got {res1}"
    res2 = s.checkDivisibility(15) # sum 6 (15%6!=0) -> False
    assert res2 is False, f"Expected False, got {res2}"
    print("3622 check-divisibility-by-digit-sum-and-product PASSED")

if __name__ == "__main__":
    run_tests()
