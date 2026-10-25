class Solution:
    def findRLEArray(self, encoded1: list[list[int]], encoded2: list[list[int]]) -> list[list[int]]:
        i, j = 0, 0
        ans = []
        val1, cnt1 = encoded1[0]
        val2, cnt2 = encoded2[0]

        while i < len(encoded1) and j < len(encoded2):
            take = min(cnt1, cnt2)
            prod = val1 * val2

            if ans and ans[-1][0] == prod:
                ans[-1][1] += take
            else:
                ans.append([prod, take])

            cnt1 -= take
            cnt2 -= take

            if cnt1 == 0:
                i += 1
                if i < len(encoded1):
                    val1, cnt1 = encoded1[i]
            if cnt2 == 0:
                j += 1
                if j < len(encoded2):
                    val2, cnt2 = encoded2[j]

        return ans

def test():
    sol = Solution()
    assert sol.findRLEArray([[1,3],[2,3]], [[6,3],[3,3]]) == [[6,6]]
    assert sol.findRLEArray([[1,3],[2,1],[3,2]], [[2,3],[3,3]]) == [[2,3],[6,1],[9,2]]

if __name__ == '__main__':
    test()
