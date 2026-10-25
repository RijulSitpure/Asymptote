class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: list[list[int]], queries: list[list[int]]) -> list[bool]:
        reach = [[False] * numCourses for _ in range(numCourses)]
        for u, v in prerequisites:
            reach[u][v] = True
        for k in range(numCourses):
            for i in range(numCourses):
                for j in range(numCourses):
                    if reach[i][k] and reach[k][j]:
                        reach[i][j] = True
        return [reach[u][v] for u, v in queries]

def test():
    sol = Solution()
    assert sol.checkIfPrerequisite(2, [[1,0]], [[0,1],[1,0]]) == [False,True], "test 1 failed"
    assert sol.checkIfPrerequisite(2, [], [[1,0],[0,1]]) == [False,False], "test 2 failed"
    assert sol.checkIfPrerequisite(3, [[1,2],[1,0],[2,0]], [[1,0],[1,2]]) == [True,True], "test 3 failed"
    print("✓ course-schedule-iv passed")

if __name__ == "__main__":
    test()
