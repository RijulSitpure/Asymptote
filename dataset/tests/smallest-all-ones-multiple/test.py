class Solution:
    def smallestRepunitDivByK(self, k: int) -> int:
        if k % 2 == 0 or k % 5 == 0:
            return -1
        
        rem = 0
        for length in range(1, k + 1):
            rem = (rem * 10 + 1) % k
            if rem == 0:
                return length
        return -1

def run_tests():
    sol = Solution()
    assert sol.smallestRepunitDivByK(1) == 1
    assert sol.smallestRepunitDivByK(2) == -1
    assert sol.smallestRepunitDivByK(3) == 3 # 111 is divisible by 3
    print("All tests passed for 3790.")

if __name__ == "__main__":
    run_tests()
