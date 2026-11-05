from solution import TaskManager

def run_tests():
    tm = TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]])
    tm.add(4, 104, 5)
    tm.edit(102, 8)
    assert tm.execTop() == 3, "First execTop failed"
    tm.rmv(101)
    tm.add(5, 105, 15)
    assert tm.execTop() == 5, "Second execTop failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

