from collections import deque

class Solution:
    def maxCandies(self, status: list[int], candies: list[int], keys: list[list[int]], containedBoxes: list[list[int]], initialBoxes: list[int]) -> int:
        n = len(status)
        has_box = [False] * n
        has_key = [False] * n
        opened = [False] * n
        q = deque()
        for b in initialBoxes:
            has_box[b] = True
            if status[b] == 1:
                q.append(b)
                opened[b] = True
        total_candies = 0
        while q:
            b = q.popleft()
            total_candies += candies[b]
            for k in keys[b]:
                has_key[k] = True
                if has_box[k] and not opened[k]:
                    opened[k] = True
                    q.append(k)
            for cb in containedBoxes[b]:
                has_box[cb] = True
                if (status[cb] == 1 or has_key[cb]) and not opened[cb]:
                    opened[cb] = True
                    q.append(cb)
        return total_candies

def test():
    sol = Solution()
    assert sol.maxCandies([1,0,1,0], [7,5,4,100], [[],[],[1],[]], [[1,2],[3],[],[]], [0]) == 16, "test 1 failed"
    assert sol.maxCandies([1,0,0,0,0,0], [1,1,1,1,1,1], [[1,2,3,4,5],[],[],[],[],[]], [[1,2,3,4,5],[],[],[],[],[]], [0]) == 6, "test 2 failed"
    print("✓ maximum-candies-you-can-get-from-boxes passed")

if __name__ == "__main__":
    test()
