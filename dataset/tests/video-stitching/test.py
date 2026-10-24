from typing import List

class Solution:
    def videoStitching(self, clips: List[List[int]], time: int) -> int:
        max_reach = [0] * (time + 1)
        for start, end in clips:
            if start <= time:
                max_reach[start] = max(max_reach[start], end)

        jumps = 0
        cur_end = 0
        next_end = 0
        for i in range(time):
            next_end = max(next_end, max_reach[i])
            if i == cur_end:
                jumps += 1
                cur_end = next_end
                if cur_end >= time:
                    return jumps
                if cur_end <= i:
                    return -1
        return jumps if cur_end >= time else -1

def test():
    sol = Solution()
    c1 = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]]
    assert sol.videoStitching(c1, 10) == 3, "test 1 failed"
    c2 = [[0,1],[1,2]]
    assert sol.videoStitching(c2, 5) == -1, "test 2 failed"
    print("✓ video-stitching passed")

if __name__ == "__main__":
    test()
