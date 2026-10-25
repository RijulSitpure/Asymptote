from collections import Counter

class Solution:
    def minSetSize(self, arr: list[int]) -> int:
        counts = Counter(arr)
        freqs = sorted(counts.values(), reverse=True)
        removed = 0
        needed = (len(arr) + 1) // 2
        ans = 0
        for f in freqs:
            removed += f
            ans += 1
            if removed >= needed:
                break
        return ans

def test():
    sol = Solution()
    assert sol.minSetSize([3,3,3,3,5,5,5,2,2,7]) == 2, "test 1 failed"
    assert sol.minSetSize([7,7,7,7,7,7]) == 1, "test 2 failed"
    print("✓ reduce-array-size-to-the-half passed")

if __name__ == "__main__":
    test()
