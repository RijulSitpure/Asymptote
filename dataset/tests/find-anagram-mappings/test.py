from typing import List

class Solution:
    def anagramMappings(self, nums1: List[int], nums2: List[int]) -> List[int]:
        pos = {}
        for idx, val in enumerate(nums2):
            if val not in pos:
                pos[val] = []
            pos[val].append(idx)
        return [pos[val].pop() for val in nums1]

def test():
    sol = Solution()
    ans = sol.anagramMappings([12, 28, 46, 32, 50], [50, 12, 32, 46, 28])
    exp_vals = [50, 12, 32, 46, 28]
    for idx, v in zip(ans, [12, 28, 46, 32, 50]):
        assert exp_vals[idx] == v, "test 1 mapping mismatch"
    assert len(sol.anagramMappings([84, 46], [84, 46])) == 2, "test 2 failed"
    print("✓ find-anagram-mappings passed")

if __name__ == "__main__":
    test()
