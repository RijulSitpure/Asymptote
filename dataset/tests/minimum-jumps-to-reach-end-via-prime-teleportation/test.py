from typing import List
from collections import defaultdict, deque

class Solution:
    def minJumps(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return 0
            
        max_val = max(nums)
        spf = list(range(max_val + 1))
        for i in range(2, int(max_val**0.5) + 1):
            if spf[i] == i:
                for j in range(i * i, max_val + 1, i):
                    if spf[j] == j:
                        spf[j] = i
                        
        def get_primes(x: int) -> set:
            res = set()
            while x > 1:
                p = spf[x]
                res.add(p)
                while x % p == 0:
                    x //= p
            return res

        prime_to_indices = defaultdict(list)
        for i, val in enumerate(nums):
            for p in get_primes(val):
                prime_to_indices[p].append(i)
                
        visited_indices = [False] * n
        visited_primes = set()
        
        queue = deque([(0, 0)]) # (idx, dist)
        visited_indices[0] = True
        
        while queue:
            curr, d = queue.popleft()
            if curr == n - 1:
                return d
                
            # Adjacent moves
            for nxt in (curr - 1, curr + 1):
                if 0 <= nxt < n and not visited_indices[nxt]:
                    visited_indices[nxt] = True
                    queue.append((nxt, d + 1))
                    
            # Prime teleportation
            for p in get_primes(nums[curr]):
                if p not in visited_primes:
                    visited_primes.add(p)
                    for nxt in prime_to_indices[p]:
                        if not visited_indices[nxt]:
                            visited_indices[nxt] = True
                            queue.append((nxt, d + 1))
                            
        return -1

def run_tests():
    s = Solution()
    res1 = s.minJumps([2, 3, 5, 2]) # 0 teleports directly to 3 (shares prime 2) -> 1 jump
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.minJumps([2, 3, 7]) # 0 -> 1 -> 2 -> 2 jumps
    assert res2 == 2, f"Expected 2, got {res2}"
    print("3629 minimum-jumps-to-reach-end-via-prime-teleportation PASSED")

if __name__ == "__main__":
    run_tests()
