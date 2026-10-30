from collections import defaultdict

class Solution:
    def splitPainting(self, segments: list[list[int]]) -> list[list[int]]:
        diff = defaultdict(int)
        endpoints = set()
        for start, end, color in segments:
            diff[start] += color
            diff[end] -= color
            endpoints.add(start)
            endpoints.add(end)
            
        sorted_pts = sorted(endpoints)
        ans = []
        curr_color = 0
        prev = sorted_pts[0]
        
        for pt in sorted_pts:
            if curr_color > 0 and pt > prev:
                ans.append([prev, pt, curr_color])
            curr_color += diff[pt]
            prev = pt
            
        return ans

def test_split_painting():
    sol = Solution()
    assert sol.splitPainting([[1,4,5],[4,7,7],[1,7,9]]) == [[1,4,14],[4,7,16]]
    assert sol.splitPainting([[1,7,9],[6,8,15],[8,10,7]]) == [[1,6,9],[6,7,24],[7,8,15],[8,10,7]]

