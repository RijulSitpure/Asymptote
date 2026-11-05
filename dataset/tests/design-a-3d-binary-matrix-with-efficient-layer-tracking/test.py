from solution import Matrix3D

def run_tests():
    m = Matrix3D(3)
    assert m.largestMatrix() == 2, "Initial check failed"
    m.setCell(0, 0, 0)
    assert m.largestMatrix() == 0, "Check after set (0,0,0) failed"
    m.setCell(1, 0, 0)
    assert m.largestMatrix() == 1, "Check after set (1,0,0) failed"
    m.unsetCell(0, 0, 0)
    assert m.largestMatrix() == 1, "Check after unset (0,0,0) failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

