# Apertus Newsletters
A simple templating system for aiding in creation of newsletters out of Apertus

## Usage:
1. Clone the repository locally
2. Make sure you have nodeJS installed
3. Install the dependencies using `sudo npm install`
4. Create the newsletter in `newsletter_data` in a foldername of your choice. By design, this should be a date in the form `YYYYMMDD_NNN` where `YYYYMMDD` is the date and `NNN` is the newsletter no on that particular date. Most of the time something like `20180406_000` should be suffficient. However, in case multiple newsletters are going out on the same day, `NNN` can be used to differentiate between them. For example, two newsletters on the same day: `20180406_000` and `20180406_001`.
5. Write your data in `data.json` file in the newly created directory under `newsletter_data`.
6. Render using command `gulp --r YYYYMMDD_NNN`
7. Find the render in `rendered_output/YYYYMMDD_NNN`.

### Assets (Images/GIFs/Videos etc):
1. Shared assets(common to all the newsletters) should be put under `newsletter_data/sharedassets`.
2. Newsletter specific assets should be put under the `newsletter_data/YYYYMMDD_NNN/assets`
