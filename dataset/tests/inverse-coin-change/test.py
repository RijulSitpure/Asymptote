from typing import List

class Solution:
    def findCoins(self, dp: List[int]) -> List[int]:
        m = len(dp) - 1
        if m < 1 or dp[0] != 1:
            return []
            
        current = [0] * (m + 1)
        current[0] = 1
        coins = []
        
        for i in range(1, m + 1):
            if dp[i] > current[i]:
                # i must be a coin
                coins.append(i)
                for s in range(i, m + 1):
                    current[s] += current[s - i]
                    
        return coins

def run_tests():
    s = Solution()
    # Coins [1, 2]: dp for amounts 0..3:
    # 0: 1, 1: 1 (1), 2: 2 (1+1, 2), 3: 2 (1+1+1, 1+2)
    res1 = s.findCoins([1, 1, 2, 2])
    assert res1 == [1, 2], f"Expected [1, 2], got {res1}"
    res2 = s.findCoins([1, 0, 1, 0, 1]) # coin [2]
    assert res2 == [2], f"Expected [2], got {res2}"
    print("3592 inverse-coin-change PASSED")

if __name__ == "__main__":
    run_tests()
