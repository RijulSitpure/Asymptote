from collections import Counter

class Solution:
    def findCommonResponse(self, responses: list[list[str]]) -> str:
        count = Counter()
        for r in responses:
            for item in set(r):
                count[item] += 1
        max_freq = max(count.values())
        candidates = [item for item, freq in count.items() if freq == max_freq]
        return min(candidates)

def run_tests():
    s = Solution()
    assert s.findCommonResponse([["good", "bad"], ["good", "ok"], ["ok"]]) == "good"
    print("All tests passed for find-the-most-common-response")

if __name__ == '__main__':
    run_tests()
