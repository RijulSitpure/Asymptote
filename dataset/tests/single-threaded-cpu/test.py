import heapq

class Solution:
    def getOrder(self, tasks: list[list[int]]) -> list[int]:
        indexed = sorted([(t[0], t[1], i) for i, t in enumerate(tasks)])
        pq = []
        ans = []
        curr_time = 0
        idx = 0
        n = len(tasks)

        while idx < n or pq:
            if not pq and curr_time < indexed[idx][0]:
                curr_time = indexed[idx][0]

            while idx < n and indexed[idx][0] <= curr_time:
                heapq.heappush(pq, (indexed[idx][1], indexed[idx][2]))
                idx += 1

            duration, orig_idx = heapq.heappop(pq)
            curr_time += duration
            ans.append(orig_idx)

        return ans

def test():
    sol = Solution()
    assert sol.getOrder([[1,2],[2,4],[3,2],[4,1]]) == [0,2,3,1]
    assert sol.getOrder([[7,10],[7,12],[7,5],[7,4],[7,2]]) == [4,3,2,0,1]

if __name__ == '__main__':
    test()
