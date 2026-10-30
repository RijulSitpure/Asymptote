from solution import Solution
s = Solution()
assert s.topStudents(['smart','brilliant','studious'], ['not'], ['this student is studious','the student is smart'], [1,2], 2) == [1,2]
assert s.topStudents(['smart','brilliant','studious'], ['not'], ['this student is not studious','the student is smart'], [1,2], 2) == [2,1]
print('All tests passed for reward-top-k-students!')
