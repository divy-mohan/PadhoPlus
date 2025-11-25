import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')

import django
django.setup()

from django.core.management import execute_from_command_line

if __name__ == '__main__':
    from django.core.wsgi import get_wsgi_application
    from gunicorn.app.base import BaseApplication
    
    class StandaloneApplication(BaseApplication):
        def __init__(self, app, options=None):
            self.options = options or {}
            self.application = app
            super().__init__()
        
        def load_config(self):
            for key, value in self.options.items():
                if key in self.cfg.settings and value is not None:
                    self.cfg.set(key.lower(), value)
        
        def load(self):
            return self.application
    
    application = get_wsgi_application()
    
    options = {
        'bind': '0.0.0.0:5000',
        'workers': 2,
        'worker_class': 'sync',
        'timeout': 120,
        'reload': True,
        'accesslog': '-',
        'errorlog': '-',
        'loglevel': 'info',
    }
    
    StandaloneApplication(application, options).run()
