from typing import List

class Solution:
    def restoreOrder(self, times: List[int], participants: List[str]) -> List[str]:
        pairs = sorted(zip(times, participants), key=lambda x: x[0])
        return [p for _, p in pairs]

def run_tests():
    sol = Solution()
    assert sol.restoreOrder([20, 10, 30], ["Alice", "Bob", "Charlie"]) == ["Bob", "Alice", "Charlie"]
    assert sol.restoreOrder([5], ["Solo"]) == ["Solo"]
    print("All tests passed for 3668.")

if __name__ == "__main__":
    run_tests()
