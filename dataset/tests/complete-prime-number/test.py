class Solution:
    def isCompletePrime(self, num: int) -> bool:
        def is_prime(x: int) -> bool:
            if x < 2:
                return False
            if x in (2, 3):
                return True
            if x % 2 == 0 or x % 3 == 0:
                return False
            d = 5
            while d * d <= x:
                if x % d == 0 or x % (d + 2) == 0:
                    return False
                d += 6
            return True
        
        if not is_prime(num):
            return False
        
        s = str(num)
        if len(s) == 1:
            return True
        
        for i in range(len(s)):
            reduced = s[:i] + s[i+1:]
            if reduced == "" or not is_prime(int(reduced)):
                return False
        return True

def run_tests():
    sol = Solution()
    assert sol.isCompletePrime(23) == True # 23 is prime, omitting '3' -> 2 (prime), omitting '2' -> 3 (prime)
    assert sol.isCompletePrime(37) == True # 37 is prime, 7 is prime, 3 is prime
    assert sol.isCompletePrime(19) == False # omitting '1' -> 9 (not prime)
    assert sol.isCompletePrime(7) == True
    print("All tests passed for 3765.")

if __name__ == "__main__":
    run_tests()
