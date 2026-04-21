from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json

app = Flask(__name__)

# Data Structure Template
# data = {
#     "key": {
#         "id": value,
#         "name": "value",
#     }
# }

# ROUTES
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/page/<id>')
def page(id=None):
    # TODO: Fetch and pass data to template
    return render_template('index.html', data={})

# AJAX Functions
@app.route('/api/endpoint', methods=['POST'])
def api_endpoint():
    json_data = request.get_json()
    # TODO: Process data
    response_data = {}
    return jsonify(response_data)


if __name__ == '__main__':
   app.run(debug=True)
