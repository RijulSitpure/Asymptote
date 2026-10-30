from solution import SORTracker

def run_tests():
    tracker = SORTracker()
    tracker.add("bradford", 2)
    tracker.add("branford", 3)
    assert tracker.get() == "branford"
    tracker.add("alps", 2)
    assert tracker.get() == "alps"
    tracker.add("orland", 2)
    assert tracker.get() == "bradford"
    tracker.add("orlando", 3)
    assert tracker.get() == "bradford"
    tracker.add("alpine", 2)
    assert tracker.get() == "bradford"
    assert tracker.get() == "orland"
    print("All tests passed for sequentially-ordinal-rank-tracker!")

if __name__ == '__main__':
    run_tests()
