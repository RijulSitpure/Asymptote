from solution import LockingTree

def run_tests():
    tree = LockingTree([-1, 0, 0, 1, 1, 2, 2])
    assert tree.lock(2, 2) is True
    assert tree.unlock(2, 3) is False
    assert tree.unlock(2, 2) is True
    assert tree.lock(4, 5) is True
    assert tree.upgrade(0, 1) is True
    assert tree.lock(0, 1) is False
    print("All tests passed for operations-on-tree!")

if __name__ == "__main__":
    run_tests()
