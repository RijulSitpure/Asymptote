class Fenwick:
    def __init__(self, size: int):
        self.tree = [0] * (size + 1)
        
    def add(self, idx: int, delta: int = 1):
        while idx < len(self.tree):
            self.tree[idx] += delta
            idx += idx & (-idx)
            
    def query(self, idx: int) -> int:
        s = 0
        while idx > 0:
            s += self.tree[idx]
            idx -= idx & (-idx)
        return s

class Solution:
    def countMajoritySubarrays(self, nums: list[int], target: int) -> int:
        # Transform: target -> +1, others -> -1
        # Prefix sum P[j] - P[i] > 0 <=> P[j] > P[i] for i < j
        # P values range from -N to +N. Shift by N + 1 for Fenwick index.
        n = len(nums)
        shift = n + 1
        bit = Fenwick(2 * n + 2)
        bit.add(0 + shift, 1) # P[0] = 0
        pref = 0
        ans = 0
        for x in nums:
            pref += 1 if x == target else -1
            # We want count of previous P[i] < pref <=> query((pref - 1) + shift)
            ans += bit.query((pref - 1) + shift)
            bit.add(pref + shift, 1)
        return ans

def run_tests():
    sol = Solution()
    assert sol.countMajoritySubarrays([1, 2, 2, 3], 2) == 5
    assert sol.countMajoritySubarrays([1, 1, 1], 1) == 6
    assert sol.countMajoritySubarrays([3, 4, 5], 1) == 0
    print("All tests passed for 3739.")

if __name__ == "__main__":
    run_tests()