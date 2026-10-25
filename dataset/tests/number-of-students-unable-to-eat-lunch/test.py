from collections import Counter

class Solution:
    def countStudents(self, students: list[int], sandwiches: list[int]) -> int:
        count = Counter(students)
        for s in sandwiches:
            if count[s] > 0:
                count[s] -= 1
            else:
                break
        return count[0] + count[1]

def test():
    sol = Solution()
    assert sol.countStudents([1,1,0,0], [0,1,0,1]) == 0
    assert sol.countStudents([1,1,1,0,0,1], [1,0,0,0,1,1]) == 3

    print("✓ number-of-students-unable-to-eat-lunch passed")

if __name__ == '__main__':
    test()
