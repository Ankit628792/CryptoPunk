
import { Pool } from "pg/lib";
import { config } from '../../utils/config';
const connectDB = new Pool(config);

export default connectDB