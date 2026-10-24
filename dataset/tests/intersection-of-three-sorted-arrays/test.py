class Solution:
    def arraysIntersection(self, arr1: list[int], arr2: list[int], arr3: list[int]) -> list[int]:
        i = j = k = 0
        res = []
        n1, n2, n3 = len(arr1), len(arr2), len(arr3)
        while i < n1 and j < n2 and k < n3:
            v1, v2, v3 = arr1[i], arr2[j], arr3[k]
            if v1 == v2 == v3:
                res.append(v1)
                i += 1
                j += 1
                k += 1
            else:
                m = min(v1, v2, v3)
                if v1 == m:
                    i += 1
                if v2 == m:
                    j += 1
                if v3 == m:
                    k += 1
        return res

def test():
    sol = Solution()
    assert sol.arraysIntersection([1, 2, 3, 4, 5], [1, 2, 5, 7, 9], [1, 3, 4, 5, 8]) == [1, 5], "test 1 failed"
    assert sol.arraysIntersection([197, 418, 523, 876, 836], [502, 517, 523, 540, 777, 876], [408, 523, 588, 650, 876, 921]) == [523, 876], "test 2 failed"
    print("✓ intersection-of-three-sorted-arrays passed")

if __name__ == "__main__":
    test()
