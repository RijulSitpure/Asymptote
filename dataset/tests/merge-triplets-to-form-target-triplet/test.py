class Solution:
    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:
        tx, ty, tz = target
        has_x = has_y = has_z = False

        for a, b, c in triplets:
            if a <= tx and b <= ty and c <= tz:
                if a == tx: has_x = True
                if b == ty: has_y = True
                if c == tz: has_z = True

        return has_x and has_y and has_z

def test():
    sol = Solution()
    assert sol.mergeTriplets([[2,5,3],[1,8,4],[1,7,5]], [2,7,5]) == True
    assert sol.mergeTriplets([[3,4,5],[4,5,6]], [3,2,5]) == False
    assert sol.mergeTriplets([[2,5,3],[2,3,4],[1,2,5],[5,2,3]], [5,5,5]) == True

if __name__ == '__main__':
    test()
