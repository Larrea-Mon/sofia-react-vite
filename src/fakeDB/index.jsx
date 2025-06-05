import mock from "./axiosMockAdapter"

import './apps/calendar'

mock.onAny().passThrough()
